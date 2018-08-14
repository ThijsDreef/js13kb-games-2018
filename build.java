import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;
class Main {
  public static void main(String[] args) {
    System.out.println("im building");
    String content = "";
    try
    {
        content = new String ( Files.readAllBytes( Paths.get("js.txt") ) );
        Runtime.getRuntime().exec("java -jar closure-compiler.jar --js " + content + " --js_output_file output/bundle.js");
    }
    catch (IOException e)
    {
        e.printStackTrace();
    }
  }
}
