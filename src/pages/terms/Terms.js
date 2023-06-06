import React from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Terms() {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <img
          className="term-logo2"
          alt="Logo secundário"
          src="/images/logo-2.png"
          style={{ width: "250px", height: "auto" }}
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography
          component="b"
          variant="body1"
          fontSize={{ fontSize: "2rem" }}
        >
          Política de privacidade Joinville Doa <br />
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          Esta política descreve como coletamos, usamos, armazenamos e
          compartilhamos seus dados pessoais na Jonville Doa. <br />
          Protegemos seus dados e você tem direitos sobre eles. <br /> <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Aplicação <br /> <br />
          </Typography>
          Esta política se aplica apenas ao tratamento de seus dados pessoais no
          Brasil, conforme a lei nº 13.709/2018.
          <Typography component="b" variant="body1">
            Dados protegidos pela LGPD <br />
          </Typography>
          Dados pessoais são informações que identificam uma pessoa. Dados
          pessoais sensíveis são informações que requerem cuidado extra, para
          proteção contra discriminação. <br /> <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Dados pessoais coletados <br /> <br />
          </Typography>
          Coletamos e usamos seus dados pessoais para processar seus pedidos,
          fornecer serviços personalizados, melhorar nossos produtos e nos
          comunicarmos com você. Você tem o direito de acessar, corrigir e
          remover seus dados, de acordo com a LGPD. <br /> <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Dados públicos <br /> <br />
          </Typography>
          Ao utilizar dados públicos, agimos de acordo com a LGPD e utilizamos
          esses dados de forma legal e ética. Entre em contato conosco se tiver
          dúvidas ou desejar remover seus dados públicos específicos. <br />{" "}
          <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Como usamos seus dados pessoais <br /> <br />
          </Typography>
          Utilizamos seus dados pessoais para facilitar a doação e melhorar sua
          experiência em nosso site. Também podemos usar seus dados para outras
          finalidades lícitas, com sua autorização ou para cumprir obrigações
          legais. <br /> <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Compartilhamento de dados pessoais <br /> <br />
          </Typography>
          Você é responsável pelas informações que compartilha. Não nos
          responsabilizamos por informações falsas ou incorretas. Não
          compartilhe conteúdo ilegal ou prejudicial. Não divulgamos informações
          que violem a privacidade. <br /> <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Retenção e exclusão de dados pessoais <br /> <br />
          </Typography>
          Tomamos medidas para manter a confidencialidade e segurança de seus
          dados. No entanto, não somos responsáveis por violações causadas por
          terceiros. Podemos compartilhar informações em casos legais. <br />{" "}
          <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Proteção dos dados pessoais <br /> <br />
          </Typography>
          Tomamos medidas para manter a confidencialidade e segurança de seus
          dados, mas não somos responsáveis por violações causadas por
          terceiros. Podemos divulgar informações conforme exigido por lei.
          <br /> <br />
          <Typography
            component="b"
            variant="body1"
            fontSize={{ fontSize: "2rem" }}
          >
            Disposições gerais <br /> <br />
          </Typography>
          Não somos responsáveis pelas ações dos usuários. Não garantimos a
          veracidade e precisão das informações fornecidas pelos usuários.
          Recomendamos cautela em transações. Não somos responsáveis por
          obrigações tributárias entre os usuários. <br />
          <Typography />
          Fale com nosso encarregado de dados pessoais Se tiver dúvidas sobre
          nossa política de privacidade, entre em contato pelo e-mail <br />{" "}
          <br />
          protecaodadospessoais@gmail.com. <br /> <br />
          <Typography />
          Data: 14 de março de 2023.
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <img
          className="term-logo2"
          alt="Logo secundário"
          src="/images/logo-2.png"
          style={{ width: "150px", height: "auto" }}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Terms;
