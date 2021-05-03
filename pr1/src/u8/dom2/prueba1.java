package u8.dom2;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;

public class prueba1 {
    public static void main(String[] args) {
        Asignatura as = new Asignatura("Alemán", 2, "Lola");
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.newDocument();

            Element root = doc.createElement("asignaturas");
            System.out.println(root.getTagName());
            doc.appendChild(root);

            Element asTag= doc.createElement("asignatura");
            asTag.setAttribute("horas",Integer.toString(as.getHorasSemanales()));
            root.appendChild(asTag);

            Element nomTag=doc.createElement("nombre");
            nomTag.setTextContent(as.getNombre());
            asTag.appendChild(nomTag);

//Isidro. asTag es la asignatura.

            System.out.println("HORAS: " + asTag.getAttribute("horas"));
            System.out.println("ATRIBUTO Y SU VALOR: " +asTag.getAttributeNode("horas"));

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer transformer = tf.newTransformer();

            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
            transformer.setOutputProperty(OutputKeys.METHOD, "xml");
            transformer.setOutputProperty("http://www.oracle.com/xml/is-standalone", "yes");


            DOMSource origen = new DOMSource(root);
            File fichero = new File("prueba.xml");
            StreamResult destino = new StreamResult(fichero);
            transformer.transform(origen, destino);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
