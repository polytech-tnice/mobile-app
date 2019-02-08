import { NgModule } from '@angular/core';
import { ActionListComponent } from './action-list/action-list';
import { ActionStepVisualizerComponent } from './action-step-visualizer/action-step-visualizer';
import { WindsockComponent } from './windsock/windsock';
import { CompassComponent } from './compass/compass';
import { TactileWindGeneratorComponent } from './tactile-wind-generator/tactile-wind-generator';
import { ActionVisualizerComponent } from './action-visualizer/action-visualizer';
import { ResultScreenComponent } from './result-screen/result-screen';
import { FunFactsComponent } from './fun-facts/fun-facts';
@NgModule({
	declarations: [ActionListComponent,
    ActionStepVisualizerComponent,
    WindsockComponent,
    CompassComponent,
    TactileWindGeneratorComponent,
    ActionVisualizerComponent,
    ResultScreenComponent,
    FunFactsComponent],
	imports: [],
	exports: [ActionListComponent,
    ActionStepVisualizerComponent,
    WindsockComponent,
    CompassComponent,
    TactileWindGeneratorComponent,
    ActionVisualizerComponent,
    ResultScreenComponent,
    FunFactsComponent]
})
export class ComponentsModule {}
