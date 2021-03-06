import Session from 'discourse/models/session';
import AppEvents from 'discourse/lib/app-events';

export default {
  name: "inject-objects",
  initialize: function(container, application) {

    // Inject appEvents everywhere
    var appEvents = AppEvents.create();
    application.register('app-events:main', appEvents, { instantiate: false });

    application.inject('controller', 'appEvents', 'app-events:main');
    application.inject('component', 'appEvents', 'app-events:main');
    application.inject('route', 'appEvents', 'app-events:main');
    application.inject('view', 'appEvents', 'app-events:main');
    application.inject('model', 'appEvents', 'app-events:main');
    Discourse.URL.appEvents = appEvents;

    // Inject Discourse.Site to avoid using Discourse.Site.current()
    var site = Discourse.Site.current();
    application.register('site:main', site, { instantiate: false });
    application.inject('controller', 'site', 'site:main');
    application.inject('component', 'site', 'site:main');
    application.inject('route', 'site', 'site:main');
    application.inject('view', 'site', 'site:main');
    application.inject('model', 'site', 'site:main');

    // Inject Discourse.SiteSettings to avoid using Discourse.SiteSettings globals
    application.register('site-settings:main', Discourse.SiteSettings, { instantiate: false });
    application.inject('controller', 'siteSettings', 'site-settings:main');
    application.inject('component', 'siteSettings', 'site-settings:main');
    application.inject('route', 'siteSettings', 'site-settings:main');
    application.inject('view', 'siteSettings', 'site-settings:main');
    application.inject('model', 'siteSettings', 'site-settings:main');

    // Inject Session for transient data
    application.register('session:main', Session.current(), { instantiate: false });
    application.inject('controller', 'session', 'session:main');
    application.inject('component', 'session', 'session:main');
    application.inject('route', 'session', 'session:main');
    application.inject('view', 'session', 'session:main');
    application.inject('model', 'session', 'session:main');

    // Inject currentUser. Components only for now to prevent any breakage
    application.register('current-user:main', Discourse.User.current(), { instantiate: false });
    application.inject('component', 'currentUser', 'current-user:main');
  }
};
