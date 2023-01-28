import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: baseline;
  height: 100vh;
  width: 100vw;
  padding: 10px;
  background: #bc8946;
`;

export const Logo = styled.img`
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: #fff;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 32px 0;
  background: #bc8946;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;

  .cardWindow {
    :hover {
      transition: 0.5s;
      background-color: #fa684e;
    }
  }
`;

export const FormContent = styled.div`
  margin-top: 40px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: baseline;

  .input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;
    margin: 15px;

    &::placeholder {
      font-size: large;
      color: #a8a8b3;
    }
  }

  .button {
    width: 100px;
    height: 70px;
    background: #04d361;
    border-radius: 5px;
    border: 0;
    margin: 10px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background: #04bf58;
    }
  }
`;
