import Card from "react-bootstrap/Card";
import { useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";
import { Container, Content, FormContent, Header, Logo, Title } from "./styles";
import Input from "../../components/Input";
import { useField } from "@unform/core";
import logo from "../../assets/logo.webp";
import whatsapp1 from "../../assets/whatsapp1.png";

interface Window {
  height: number;
  width: number;
  color: string;
}

const Home = () => {
  const [window, setWindow] = useState<Array<Window>>([]);
  const [color, setColor] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [showValue, setShowValue] = useState<boolean>(false);
  const formRef = useRef<any>();

  const calcule = () => {
    // cor alumminio a partir de 0.60 x 0.60 = R$ 79,30
    // cor alumminio a partir de 0.80 x 0.80 = R$ 106,30
    // cor alumminio a partir de 1,10 x 1,10 = R$ 169,90

    // outras cores a partir de 0.60 x 0.60 = R$ 89,70
    // outras cores a partir de 0.80 x 0.80 = R$ 116,70
    // outras cores a partir de 1,10 x 1,10 = R$ 186,30

    const total = window.reduce((acc, item) => {
      const { height, width, color } = item;
      const total = height * width;
      if (total >= 1.1 * 1.1) {
        if (color === "Aluminio") {
          return acc + 169.9;
        } else {
          return acc + 186.3;
        }
      } else if (total >= 0.8 * 0.8) {
        if (color === "Aluminio") {
          return acc + 106.3;
        } else {
          return acc + 116.7;
        }
      } else {
        if (color === "Aluminio") {
          return acc + 79.3;
        } else {
          return acc + 89.7;
        }
      }
    }, 0);

    setTotal(total);

    setShowValue(true);
  };

  useEffect(() => {
    if (window.length === 0) {
      setShowValue(false);
    }
  }, [window]);

  const handleSubmit = (data: Window) => {
    setShowValue(false);
    const { height, width } = data;

    const newWindow = {
      height,
      width,
      color:
        color === "aluminum"
          ? "Aluminio"
          : color === "white"
          ? "Branco"
          : color === "black"
          ? "Preto"
          : color === "bronze"
          ? "Bronze"
          : "Aluminio",
    };
    setWindow([...window, newWindow]);
  };

  const getText = () => {
    let text =
      `*Orçamento de tela mosquiteira*\n\n` +
      window.reduce((acc, item, index) => {
        const { height, width, color } = item;
        return (
          acc +
          `*Janela ${
            index + 1
          }*\nAltura: ${height}\nLargura: ${width}\nCor: ${color}\n\n`
        );
      }, "");

    text += `*Valor Total:* R$ ${total}`;
    return text;
  };

  return (
    <Container>
      <Header>
        <Logo src={logo}></Logo>
        <Title>Faça aqui, o seu orçamento de tela mosquiteira</Title>
      </Header>
      <Content>
        <FormContent>
          <Form
            id="form-window"
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Input
              name="width"
              label=""
              placeholder="Largura"
              type="tel"
              required
            />
            <Input
              name="height"
              label=""
              placeholder="Altura"
              type="tel"
              required
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "max-content",
              }}
            >
              <label style={{ color: "white" }}>Escolha a cor do perfil:</label>

              <select
                ref={formRef}
                required
                name="color"
                id="color"
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              >
                <option>Selecione</option>
                <option value="aluminum">Aluminio</option>
                <option value="white">Branco</option>
                <option value="black">Preto</option>
                <option value="bronze">Bronze</option>
              </select>
            </div>
            <button className="button" type="submit">
              Adicionar Janela +
            </button>
          </Form>
          <button className="button" onClick={() => calcule()}>
            Calcular Valor Total
          </button>
          {showValue ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card style={{ margin: "5px" }}>
                <Card.Body>
                  <Card.Title>Valor Total</Card.Title>
                  <Card.Text>R$ {total}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <></>
          )}
        </FormContent>
        <div className="window">
          {window.map((item, idx) => (
            <Card className="cardWindow" style={{ margin: "5px" }}>
              <Card.Body
                key={idx}
                onClick={() => {
                  const newWindow = window.filter(
                    (item, index) => index !== idx
                  );
                  setWindow(newWindow);
                }}
                title="Clique para remover"
                style={{ cursor: "pointer" }}
              >
                <Card.Title>Janela {window.indexOf(item) + 1}</Card.Title>
                <Card.Text>Altura: {item.height}</Card.Text>
                <Card.Text>Largura: {item.width}</Card.Text>

                {<Card.Text>Cor: {item.color}</Card.Text>}
              </Card.Body>
            </Card>
          ))}
        </div>
      </Content>
      <div
        id="floating-whatsapp"
        style={{
          position: "fixed",
          width: "60px",
          height: "60px",
          bottom: "40px",
          right: "40px",
          backgroundColor: "#25d366",
          borderRadius: "50px",
          textAlign: "center",
          fontSize: "30px",
          boxShadow: "2px 2px 3px #999",
          zIndex: 100,
        }}
      >
        <a
          href={`https://api.whatsapp.com/send?phone=5562981587561&text=${getText()}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={whatsapp1}
            alt="whatsapp"
            height={60}
            title="Clique para enviar o orçamento via Whatsapp!"
          />
        </a>
      </div>
    </Container>
  );
};

export default Home;
