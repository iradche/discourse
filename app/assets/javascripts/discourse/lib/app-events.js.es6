export default Ember.Object.extend(Ember.Evented);

var id = 1;
function newKey() {
  return "_view_app_event_" + (id++);
}

export function createViewListener(eventName, cb) {
  var extension = {};
  extension[newKey()] = function() {
    this.appEvents.on(eventName, this, cb);
  }.on('didInsertElement');

  extension[newKey()] = function() {
    this.appEvents.off(eventName, this, cb);
  }.on('willDestroyElement');

  return extension;
}

export function listenForViewEvent(viewClass, eventName, cb) {
  viewClass.reopen(createViewListener(eventName, cb));
}
