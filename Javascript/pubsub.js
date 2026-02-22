class Pubsub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  publish(event, data) {
    if (!this.events[event]) return;

    // Clone to prevent mutation during iteration
    const listeners = [...this.events[event]];

    listeners.forEach((callback) => {
      callback(data);
    });
  }

  once(event, callback) {
    const wrapper = (data) => {
      // Remove before executing to avoid edge cases
      unsubscribe();
      callback(data);
    };

    const unsubscribe = this.subscribe(event, wrapper);
    return unsubscribe;
  }

  onceMany(event, count, callback) {
    if (count <= 0) return () => {};

    let remaining = count;

    const wrapper = (data) => {
      remaining--;

      if (remaining <= 0) {
        unsubscribe();
      }

      callback(data);
    };

    const unsubscribe = this.subscribe(event, wrapper);

    return unsubscribe;
  }
}
