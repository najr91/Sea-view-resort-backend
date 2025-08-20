import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN || ""; 


const respuestasFijas = {
  "check in": "El check-in es a partir de las 14:00 hs.",
  "check-in": "El check-in es a partir de las 14:00 hs.",
  "check out": "El check-out es hasta las 11:00 hs.",
  "check-out": "El check-out es hasta las 11:00 hs.",
  "transfer": "Sí, ofrecemos transfers desde y hacia el aeropuerto. Se debe reservar con anticipación.",
  "aeropuerto": "Sí, contamos con transfers desde y hacia el aeropuerto, con reserva previa.",
  "pet": "Somos pet friendly 🐾, pedimos a los dueños ser responsables con sus mascotas.",
  "mascota": "Somos pet friendly 🐾, pedimos a los dueños ser responsables con sus mascotas.",
  "pet friendly": "Sí, aceptamos mascotas; por favor, responsabilidad de los dueños.",
  "celiaco": "Contamos con opciones sin TACC para personas celíacas.",
  "celíaco": "Contamos con opciones sin TACC para personas celíacas.",
  "sin tacc": "Contamos con opciones sin TACC para personas celíacas.",
  "wifi": "Todo el hotel cuenta con WiFi gratuito de alta velocidad.",
  "piscina": "Tenemos piscina al aire libre y climatizada (según temporada).",
  "spa": "Contamos con spa con masajes y sauna (con costo adicional).",
  "estacionamiento": "Tenemos estacionamiento cubierto sujeto a disponibilidad.",
  "estacionar": "Tenemos estacionamiento cubierto sujeto a disponibilidad.",
  "desayuno": "El desayuno buffet está incluido en la tarifa.",
  "horario restaurante": "Nuestro restaurante abre de 12:30 a 15:30 y de 20:00 a 23:30.",
  "habitaciones": "Ofrecemos habitaciones estándar, superior y suite, con vista al mar según disponibilidad.",
  "precio": "Nuestros precios varían según la temporada y tipo de habitación.",
  "hola": "¡Hola! ¿En qué puedo ayudarte?",
  "buenas": "¡Hola! ¿En qué puedo ayudarte?"
};

function buscarRespuestaFija(mensaje) {
  const m = mensaje.toLowerCase();
  const claves = Object.keys(respuestasFijas).sort((a, b) => b.length - a.length);
  for (const clave of claves) {
    if (m.includes(clave)) return respuestasFijas[clave];
  }
  return null;
}

app.post("/chat", async (req, res) => {
  const { message = "" } = req.body;

 
  const fija = buscarRespuestaFija(message);
  if (fija) return res.json({ reply: fija });

 
  if (!HF_TOKEN) {
    return res.json({ reply: "No tengo esa información ahora mismo, ¿querés consultar recepción por WhatsApp?" });
  }

  try {
    const hfRes = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium-spanish",
      { inputs: message },
      { headers: { Authorization: `Bearer ${HF_TOKEN}` }, timeout: 12000 }
    );

    const reply =
      Array.isArray(hfRes.data) && hfRes.data[0]?.generated_text
        ? hfRes.data[0].generated_text
        : "Perdón, no tengo esa info ahora mismo.";

    return res.json({ reply });
  } catch (e) {
    console.error("HF error:", e?.response?.data || e.message);
    return res.json({ reply: "Perdón, hubo un error al conectar con IA. Probá de nuevo más tarde." });
  }
});


const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Backend en http://localhost:${PORT}`));
