import { NgModule } from '@angular/core';
import { ActionListComponent } from './action-list/action-list';
import { ActionStepVisualizerComponent } from './action-step-visualizer/action-step-visualizer';
@NgModule({
	declarations: [ActionListComponent,
    ActionStepVisualizerComponent],
	imports: [],
	exports: [ActionListComponent,
    ActionStepVisualizerComponent]
})
export class ComponentsModule {}
