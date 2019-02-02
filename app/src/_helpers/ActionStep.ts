import { ActionPhaseEnum } from "../_models/actions/action-phase-step";

export class ActionStepHelper {

    // TODO - get the duration directly from server so if it needs to be changed, only change it in server...
    public static duration(step: ActionPhaseEnum) {
        switch (step) {
            case ActionPhaseEnum.CREATION: return 20;
            case ActionPhaseEnum.VOTE: return 10;
            case ActionPhaseEnum.RESULTS: return 5;
            case ActionPhaseEnum.WAITING: return -1;
        }
    }

    public static actionStep(step: ActionPhaseEnum): string {
        switch (step) {
            case ActionPhaseEnum.CREATION: return "Ajout d'actions";
            case ActionPhaseEnum.VOTE: return "Vote en cours";
            case ActionPhaseEnum.RESULTS: return "Affichage des resultats du vote";
            case ActionPhaseEnum.WAITING: return "Partie en cours";
        }
    }
}