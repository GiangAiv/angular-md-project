import { Component } from '@angular/core';
import { ModalComponent } from 'src/app/code/modal/modal.component';

@Component({
  selector: 'app-modal-demo',
  template: `
    <div class="space-y-4">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        (click)="openModal('sm')">
        Open Small Modal
      </button>

      <button
        class="px-4 py-2 bg-green-500 text-white rounded"
        (click)="openModal('lg')">
        Open Large Modal
      </button>

      <app-modal
        [open]="isOpen"
        [title]="modalTitle"
        [size]="modalSize"
        (close)="closeModal()">
        <div class="p-4">
          <p class="mb-4">This is a {{ modalSize }} modal dialog.</p>
        </div>
      </app-modal>
    </div>
  `,
  standalone: true,
  imports: [ModalComponent]
})
export class ModalDemoComponent {
  isOpen = false;
  modalTitle = 'Modal Title';
  modalSize: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  openModal(size: 'sm' | 'md' | 'lg' | 'xl') {
    this.modalSize = size;
    this.modalTitle = `${size.toUpperCase()} Modal`;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
} 