package ember;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Created by elliot on 14.11.27.
 */
public class ParserTest {

    @Test
    public void testCreateParser() {
        Parser p = new Parser();
    }

    @Test
    public void testParseSimpleDoc() throws IOException {
        Parser p = new Parser();
        Assert.assertEquals("｢say｣\n block => ｢say｣\n  blockContents => ｢say｣\n   unterminatedLine => ｢say｣\n    lineContents => ｢say｣\n     invocation => ｢say｣\n      identifier => ｢say｣\n       escapedName => ｢say｣\n       parameterList => ｢｣\n        nullParameterList => ｢｣\n      parameterList => ｢｣\n       nullParameterList => ｢｣\n", new String(p.getTreeDiagram("say".getBytes(StandardCharsets.UTF_8)), StandardCharsets.UTF_8));
    };

}
