// ElementRef, forwardRef, Output, EventEmitter
import { Component, OnInit, Inject, Injector, ElementRef, forwardRef, Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../app.component';

import * as wjCore from 'wijmo/wijmo';
import * as wjInput from 'wijmo/wijmo.angular2.input';
import { WjListBox, wjListBoxMeta } from 'wijmo/wijmo.angular2.input';

@Component({
  selector: 'custom-list-box',
  template: wjListBoxMeta.template,
  styleUrls: ['./custom-list-box.component.css'],
  inputs: [...wjListBoxMeta.inputs], 
  outputs: wjListBoxMeta.outputs,
  providers: [
    { provide: 'WjComponent', useExisting: forwardRef(() => CustomListBoxComponent) },
    ...wjListBoxMeta.providers
]
})
export class CustomListBoxComponent extends WjListBox implements OnInit {

  private _selection: any[] = [];
  
  /*
  * Occurs on the 'selection' property change
  */
  @Output('selectionChanged') selectionChanged = new EventEmitter(true);

  /*
  * Returns an array of multiselected items.
  */
  get selection(): any[] {
      return this._selection;
  }

  constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector) { 
    super(elRef, injector, WjListBox);

  }

  ngOnInit(){
    var anchor = 0;
    this.hostElement.addEventListener("click", (e: MouseEvent) => {
      
      if(wjCore.hasClass(e.target as HTMLElement, 'wj-listbox-item')){
        let items = this.hostElement.children,
          selClass = 'wj-state-selected';
        
        // prevent default behavior
        e.preventDefault();

        // ctrl+click toggles item
        if(e.ctrlKey || e.metaKey){
          var selected = wjCore.hasClass(e.target as HTMLElement, selClass);
          wjCore.toggleClass(e.target as HTMLElement, selClass, !selected);
          for (var i=0; i<items.length; i++){
            if (items[i] == e.target) {
              anchor = i;
              break;
            }
          }
        // shift+click extends the selection
        } else if (e.shiftKey){
          var index = -1;
          for (var i=0; i<items.length; i++){
            if(items[i] == e.target){
              index = i;
              break;
            }
          }
          for (var i=0; i<items.length; i++){
            var selected = (i <= anchor && i >= index) || (i <= index && i >= anchor);
            wjCore.toggleClass(items[i] as HTMLElement, selClass, selected);
          }
          // simple click selects item
        } else {
          for (var i=0; i < items.length; i++){
            var selected = items[i] == e.target;
            wjCore.toggleClass(items[i] as HTMLElement, selClass, selected);
            if(selected) {
              anchor = i;
              this.selectedIndex = anchor;
            }
          }
        }

        var selItems = [];
        for (var i=0; i < selItems.length; i++) {
          if (wjCore.hasClass(items[i] as HTMLElement, selClass)){
            selItems.push(this.collectionView.items[i]);
          }
        }

        this._updateSelection(items);
      }
    }, true);
  } // end ngOnInit

  // override the base class implementation to update the 'selection' property value
  onLoadedItems(e?: wjCore.EventArgs) {
    super.onLoadedItems(e);
    this._updateSelection();
    console.log('onLoadedItems')
  }

  //recreates 'selection' property value, and triggers selectionChanged event.
  private _updateSelection(items?: NodeListOf<Element>) {
    if (!items) {
        items = this.hostElement.querySelectorAll('.wj-listbox-item');
    }
    let selClass = 'wj-state-selected',
        selItems = this._selection = [];
    for (var i = 0; i < items.length; i++) {
        if (wjCore.hasClass(items[i] as HTMLElement, selClass)) {
            selItems.push(this.collectionView.items[i]);
        }
    }
    this.selectionChanged.emit();
  }

}
