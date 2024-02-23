import Step from 'shepherd.js/src/types/step';
import {IntroJsService} from "./intro-js.service";
import {Steps} from "./steps";

export const builtInButtons = {
    cancel: {
        classes: 'cancel-button',
        secondary: true,
        text: 'Exit',
        type: 'cancel'
    },
    next: {
        classes: 'next-button',
        text: 'Next',
        type: 'next'
    },
    back: {
        classes: 'back-button',
        secondary: true,
        text: 'Back',
        type: 'back'
    }
};

export const defaultStepOptions: Step.StepOptions = {
    classes: 'shepherd-theme-arrows custom-default-class',
    scrollTo: true,
    cancelIcon: {
        enabled: true
    }
};

export function stepsFirstUsage(introJsService: IntroJsService, step: Steps): Step.StepOptions[] {
    // https://github.com/shipshapecode/react-shepherd/issues/288
    return [
        {
            attachTo: {
                element: '#userguide-overview',
                on: 'bottom'
            },
            buttons: [
                builtInButtons.cancel,
                builtInButtons.next
            ],
            classes: 'custom-class-name-1 custom-class-name-2',
            id: 'custom-time',
            title: 'Willkommen',
            text: 'Willkommen beim Nadin Timer,<br><br>eine schnelle Möglichkeit für unterhaltsame Meetingpausen.',
            when: {
                destroy: function () {
                    introJsService.markAsDone(step);
                },
                cancel: function () {
                    introJsService.markAsDone(step);
                },
                complete: function () {
                    introJsService.markAsDone(step);
                },
            },
        },
        {
            attachTo: {
                element: '#userguide-absolute-times',
                on: 'top'
            },
            buttons: [
                builtInButtons.cancel,
                builtInButtons.back,
                builtInButtons.next
            ],
            classes: 'custom-class-name-1 custom-class-name-2',
            id: 'enter-time',
            title: 'Minutes',
            text: 'Hier kannst du die gewünschte Zeit in minuten auswählen.<br>Also z.B. "für 5min".',
            when: {
                destroy: function () {
                    introJsService.markAsDone(step);
                },
                cancel: function () {
                    introJsService.markAsDone(step);
                },
                complete: function () {
                    introJsService.markAsDone(step);
                },
            },
        },
        {
            attachTo: {
                element: '#userguide-relative-times',
                on: 'top'
            },
            buttons: [
                builtInButtons.cancel,
                builtInButtons.back,
                builtInButtons.next
            ],
            classes: 'custom-class-name-1 custom-class-name-2',
            id: 'modal',
            title: 'Uhrzeit',
            text: 'Hier kannst du die gewünschte Zeit bis zu einem Zeitpunkt auswählen.<br> Also z.B. "bis halb".',
            when: {
                destroy: function () {
                    introJsService.markAsDone(step);
                },
                cancel: function () {
                    introJsService.markAsDone(step);
                },
                complete: function () {
                    introJsService.markAsDone(step);
                },
            },
        },
        {
            attachTo: {
                element: '#userguide-custom-times',
                on: 'top'
            },
            buttons: [
                builtInButtons.cancel,
                builtInButtons.back
            ],
            classes: 'custom-class-name-1 custom-class-name-2',
            id: 'modal',
            title: 'Eigenes',
            text: 'Hier kannst du eigene Zeitäume eingeben wenn die vorgeschlagenen nicht ausreichen.',
            when: {
                destroy: function () {
                    introJsService.markAsDone(step);
                },
                cancel: function () {
                    introJsService.markAsDone(step);
                },
                complete: function () {
                    introJsService.markAsDone(step);
                },
            },
        }
    ];
}

export function stepsCustomTimer(introJsService: IntroJsService, step: Steps): Step.StepOptions[] {
    // https://github.com/shipshapecode/react-shepherd/issues/288
    return [{
        attachTo: {
            element: '#userguide-custom-times',
            on: 'bottom'
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'custom-time',
        title: 'Custom times',
        text: `
          <p>
            Sometimes it is not good enough to have predefined times.
          </p>

          <p>
          Use this setting to define your own time ranges.
          </p>`,
        when: {
            destroy: function () {
                introJsService.markAsDone(step);
            },
            cancel: function () {
                introJsService.markAsDone(step);
            },
            complete: function () {
                introJsService.markAsDone(step);
            },
        },
    },
        {
            attachTo: {
                element: '#userguide-custom-input',
                on: 'top'
            },
            buttons: [
                builtInButtons.cancel,
                builtInButtons.back,
                builtInButtons.next
            ],
            classes: 'custom-class-name-1 custom-class-name-2',
            id: 'enter-time',
            title: 'Enter Time',
            text: 'Enter the desired number of minutes',
            when: {
                destroy: function () {
                    introJsService.markAsDone(step);
                },
                cancel: function () {
                    introJsService.markAsDone(step);
                },
                complete: function () {
                    introJsService.markAsDone(step);
                },
            },
        },
        {
            attachTo: {
                element: '#userguide-custom-start',
                on: 'top'
            },
            buttons: [
                builtInButtons.cancel,
                builtInButtons.back
            ],
            classes: 'custom-class-name-1 custom-class-name-2',
            id: 'modal',
            title: 'Start Timer',
            text: 'And then just press this button, it will start the time with the entered duration.',
            when: {
                destroy: function () {
                    introJsService.markAsDone(step);
                },
                cancel: function () {
                    introJsService.markAsDone(step);
                },
                complete: function () {
                    introJsService.markAsDone(step);
                },
            },
        }
    ];
}

export function stepsLanguage(introJsService: IntroJsService, step: Steps): Step.StepOptions[] {
    // https://github.com/shipshapecode/react-shepherd/issues/288
    return [{
        attachTo: {
            element: '#userguide-language',
            on: 'bottom'
        },
        buttons: [
            builtInButtons.cancel,
            builtInButtons.next
        ],
        classes: 'custom-class-name-1 custom-class-name-2',
        id: 'userguide-language',
        title: 'Localisation',
        text: 'You can select the language for the user interface',
        when: {
            destroy: function () {
                introJsService.markAsDone(step);
            },
            cancel: function () {
                introJsService.markAsDone(step);
            },
            complete: function () {
                introJsService.markAsDone(step);
            },
        },
    }
    ];
}
