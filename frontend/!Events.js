class FeatEvents {
  constructor() {
      this.events = {};
      this.stateEvents = {};
  }

  onStateChange(name, listener) {
    if (!this.stateEvents[name]) {
      this.stateEvents[name] = [];
    }

    this.stateEvents[name].push(listener);
  }

  emitState(name, data) {
    if (!this.stateEvents[name]) return;

    const fireCallbacks = (callback) => {
        callback(data);
    };

    this.stateEvents[name].forEach(fireCallbacks);
  }

  on(name, listener) {
      if (!this.events[name]) {
          this.events[name] = [];
      }

      this.events[name].push(listener);
  }

  emit(name, data) {
      if (!this.events[name]) return;

      const fireCallbacks = (callback) => {
          callback(data);
      };

      this.events[name].forEach(fireCallbacks);
  }
}