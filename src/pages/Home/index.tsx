import Card from "react-bootstrap/Card";
import { useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";
import { Container, Content, FormContent, Header, Logo, Title } from "./styles";
import Input from "../../components/Input";

interface Window {
  height: number;
  width: number;
}

const Home = () => {
  const [window, setWindow] = useState<Array<Window>>([]);
  const [showValue, setShowValue] = useState<boolean>(false);
  const formRef = useRef<any>();

  const calcule = () => {
    setShowValue(true);
  };

  const handleSubmit = (data: Window) => {
    setShowValue(false);
    const { height, width } = data;

    const newWindow = {
      height,
      width,
    };
    console.log("newWindow", newWindow);
    setWindow([...window, newWindow]);
  };

  console.log("window", window);

  return (
    <Container>
      <Header>
        <Logo src="/src/assets/cortnobre_logo.png"></Logo>
        <Title>Faça aqui, o seu orçamento de tela mosquiteira</Title>
      </Header>
      <Content>
        <FormContent>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Input
              name="height"
              label=""
              placeholder="Altura"
              type="tel"
              required
            />
            <Input
              name="width"
              label=""
              placeholder="Largura"
              type="tel"
              required
            />
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
                  <Card.Text>R$ 0,00</Card.Text>
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
              </Card.Body>
            </Card>
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default Home;
