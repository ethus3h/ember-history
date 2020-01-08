package ember.Client.Commands;

import ember.Client.Session.Session;
import ember.Common.Process.EmberProcess;

/**
 * Created by elliot on 14.11.28.
 */
public class Quit implements EmberProcess {

    private String[] args;
    private String command;
    private Session session;

    @Override
    public void processSignalHandler(Integer signal) {
    }

    @Override
    public void run() {

    }

    @Override
    public void start(String cmd, Session s, Object... args) throws Exception {
        this.command = cmd;
        this.session = s;
        this.args = (String[]) args;
    }

    @Override
    public void pause() {

    }

    @Override
    public void resume() {

    }

    @Override
    public void terminate() {

    }

    @Override
    public void kill() {

    }
}
