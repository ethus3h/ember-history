package ember.Client.Session;

import ember.Client.Context;

/**
 * Created by elliot on 14.11.28.
 */
public class NullSession extends Session {
    public NullSession() {
        super();
        this.context = new Context("null");
    }
}
