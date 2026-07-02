import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 40px 24px;
`;

const ErrorCode = styled.h1`
  font-size: 96px;
  font-weight: 800;
  margin: 0 0 12px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
`;

const Description = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.55);
  margin: 0 0 32px;
  max-width: 380px;
  line-height: 1.6;
`;

const StyledButton = styled.button`
  padding: 12px 36px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page not found</Title>
      <Description>
        The page you are looking for does not exist or has been moved.
      </Description>
      <StyledButton onClick={() => navigate("/")}>
        🏠 Go home
      </StyledButton>
    </Container>
  );
};

export default NotFoundPage;
