const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 4201;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
fs.ensureDirSync(uploadsDir);

// File data storage (in-memory for simplicity, but backed by real files)
let files = [];
const dataFile = path.join(__dirname, "files.json");

// Load existing files data
try {
  if (fs.existsSync(dataFile)) {
    files = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } else {
    // Initialize with sample data
    const sampleContent =
      "# Welcome\n\nThis is your first markdown file. You can edit it by clicking the edit button.\n\n## Features\n\n- Create new markdown files\n- Edit existing files\n- Preview markdown with syntax highlighting\n- Delete files you no longer need";
    const sampleId = uuidv4();
    const sampleFile = {
      id: sampleId,
      title: "Welcome to Markdown Editor",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["welcome", "tutorial"],
    };

    // Save sample file content
    fs.writeFileSync(path.join(uploadsDir, `${sampleId}.md`), sampleContent);

    // Add to files array
    files.push(sampleFile);
    fs.writeFileSync(dataFile, JSON.stringify(files, null, 2));
  }
} catch (error) {
  console.error("Error initializing files:", error);
  files = [];
}

// CRUD API Endpoints

// Get all files
app.get("/api/markdown", (req, res) => {
  // Return metadata only, not file contents
  res.json(files);
});

// Get a specific file
app.get("/api/markdown/:id", (req, res) => {
  const { id } = req.params;
  const file = files.find((f) => f.id === id);

  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    // Read file content
    const filePath = path.join(uploadsDir, `${id}.md`);
    const content = fs.readFileSync(filePath, "utf8");

    // Return file with content
    res.json({
      ...file,
      content,
    });
  } catch (error) {
    res.status(500).json({ error: "Error reading file" });
  }
});

// Create a new file
app.post("/api/markdown", (req, res) => {
  const { title, content, tags = [] } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const id = uuidv4();
    const now = new Date();

    // Create file metadata
    const newFile = {
      id,
      title,
      createdAt: now,
      updatedAt: now,
      tags,
    };

    // Save file content to disk
    const filePath = path.join(uploadsDir, `${id}.md`);
    fs.writeFileSync(filePath, content);

    // Add to files array and save metadata
    files.push(newFile);
    fs.writeFileSync(dataFile, JSON.stringify(files, null, 2));

    // Return the new file with content
    res.status(201).json({
      ...newFile,
      content,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating file" });
  }
});

// Update an existing file
app.put("/api/markdown/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  const fileIndex = files.findIndex((f) => f.id === id);

  if (fileIndex === -1) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    // Update file metadata
    const updatedFile = {
      ...files[fileIndex],
      title: title !== undefined ? title : files[fileIndex].title,
      tags: tags !== undefined ? tags : files[fileIndex].tags,
      updatedAt: new Date(),
    };

    // If content was provided, update the file on disk
    if (content !== undefined) {
      const filePath = path.join(uploadsDir, `${id}.md`);
      fs.writeFileSync(filePath, content);
    } else {
      // Read existing content
      const filePath = path.join(uploadsDir, `${id}.md`);
      content = fs.readFileSync(filePath, "utf8");
    }

    // Update in files array and save metadata
    files[fileIndex] = updatedFile;
    fs.writeFileSync(dataFile, JSON.stringify(files, null, 2));

    // Return updated file with content
    res.json({
      ...updatedFile,
      content,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating file" });
  }
});

// Delete a file
app.delete("/api/markdown/:id", (req, res) => {
  const { id } = req.params;
  const fileIndex = files.findIndex((f) => f.id === id);

  if (fileIndex === -1) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    // Remove file from disk
    const filePath = path.join(uploadsDir, `${id}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from files array and save metadata
    files.splice(fileIndex, 1);
    fs.writeFileSync(dataFile, JSON.stringify(files, null, 2));

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error deleting file" });
  }
});

// Upload a markdown file
app.post("/api/markdown/upload", (req, res) => {
  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ error: "Filename and content are required" });
  }

  try {
    const id = uuidv4();
    const now = new Date();

    // Extract title from filename (remove extension)
    const title = filename.replace(/\.[^/.]+$/, "");

    // Create file metadata
    const newFile = {
      id,
      title,
      createdAt: now,
      updatedAt: now,
      tags: [],
    };

    // Save file content to disk
    const filePath = path.join(uploadsDir, `${id}.md`);
    fs.writeFileSync(filePath, content);

    // Also save original filename for reference (optional)
    const originalFilePath = path.join(
      uploadsDir,
      `${id}_original_${filename}`,
    );
    fs.writeFileSync(originalFilePath, content);

    // Add to files array and save metadata
    files.push(newFile);
    fs.writeFileSync(dataFile, JSON.stringify(files, null, 2));

    // Return the new file with content
    res.status(201).json({
      ...newFile,
      content,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
