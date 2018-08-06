import Animation from './animation';

class Main {

  constructor() {
    this.io = io();

    this.loadListenner();
    if(this.isMobile()) {
      let message_div = document.body.appendChild(document.createElement('div'));
      message_div.id = "message";
      message_div.appendChild(document.createElement('h1')).innerHTML = "This is going to be your control, just move it and enjoy";
    } else{
      this.animation = new Animation();
    }

    if(!this.isMobile()) this.io.on('motionValues', event => this.animation.setMotionEventValues(event.alpha, event.beta, event.gamma));
  }

  isMobile() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  loadListenner() {

    if (window.DeviceOrientationEvent) {
        window.addEventListener("devicemotion", event => {

            // alpha: rotation around z-axis
            var rotateDegrees = event.rotationRate.alpha;
            // gamma: left to right
            var leftToRight = event.rotationRate.gamma;
            // beta: front back motion
            var frontToBack = event.rotationRate.beta;

            this.io.emit('orientationChange', {alpha: event.rotationRate.alpha, gamma: event.rotationRate.gamma, beta: event.rotationRate.beta});
        }, true);
    }

    let handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => {
        // do something amazing
      //  console.log('front ',frontToBack,' left ',leftToRight,' rotateDegrees ',rotateDegrees);
      //  this.io.emit('orientationChange', 'event');
    };
  }

  orientationHandler(event) {
    this.io.emit('orientationChange', event);
  }

}

const game = new Main();
