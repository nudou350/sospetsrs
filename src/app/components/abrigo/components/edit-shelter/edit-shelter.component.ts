import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-edit-shelter',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './edit-shelter.component.html',
  styleUrl: './edit-shelter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditShelterComponent {
  needs = ['Água','Ração', 'Remédios', 'Roupinhas', 'Coleiras', 'Itens de higiene', 'Fraldas','Colchonetes','Ajuda financeira','Tapete Higiênico','Sachê para cachorro', 'Sachê para gato']
  selectedNeeds = signal<string[]>([])

  updateList(item: string){
    console.log(item)
    if(this.selectedNeeds().includes(item)){
      const newList = this.selectedNeeds().filter(need => need !== item)
      this.selectedNeeds.set(newList)
    }else{
      this.selectedNeeds.update(need => [...need, item])
    }
  }
 }
