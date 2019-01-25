import { NgModule } from '@angular/core';
import { ActionListComponent } from './action-list/action-list';
import { ActionStepVisualizerComponent } from './action-step-visualizer/action-step-visualizer';
import { WindsockComponent } from './windsock/windsock';
@NgModule({
	declarations: [ActionListComponent,
    ActionStepVisualizerComponent,
    WindsockComponent],
	imports: [],
	exports: [ActionListComponent,
    ActionStepVisualizerComponent,
    WindsockComponent]
})
export class ComponentsModule {}
