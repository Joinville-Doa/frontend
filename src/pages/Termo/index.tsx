import React from 'react'
// import Logo from "../img/Logo.png"
import Logo_sec from '../img/logo2.jpg'

function Termo() {
    return (
        <div className='app-container'>
            <div className="navbar">
                <img className="navbar-logo"  alt='Logo Joinville Doa' />
                {/* src={Logo} */}
            </div>
            <div className='body-terms'>
                <p className='text-terms'>
                    Esta política descreve como coletamos, usamos, armazenamos e compartilhamos seus dados pessoais na Jonville Doa. Protegemos seus dados e você tem direitos sobre eles.

                    <b>Aplicação</b>
                    Esta política se aplica apenas ao tratamento de seus dados pessoais no Brasil, conforme a lei nº 13.709/2018.

                    <b>Dados protegidos pela LGPD</b>
                    Dados pessoais são informações que identificam uma pessoa. Dados pessoais sensíveis são informações que requerem cuidado extra, para proteção contra discriminação.

                    <b>Dados pessoais coletados</b>
                    Coletamos e usamos seus dados pessoais para processar seus pedidos, fornecer serviços personalizados, melhorar nossos produtos e nos comunicarmos com você. Você tem o direito de acessar, corrigir e remover seus dados, de acordo com a LGPD.

                    <b>Dados públicos</b>
                    Ao utilizar dados públicos, agimos de acordo com a LGPD e utilizamos esses dados de forma legal e
                    ética. Entre em contato conosco se tiver dúvidas ou desejar remover seus dados públicos específicos.

                    <b>Como usamos seus dados pessoais</b>
                    Utilizamos seus dados pessoais para facilitar a doação e melhorar sua experiência em nosso site. Também podemos usar seus dados para outras finalidades lícitas, com sua autorização ou para cumprir obrigações legais.

                    <b>Compartilhamento de dados pessoais</b>
                    Você é responsável pelas informações que compartilha. Não nos
                    sua autorização ou para cumprir obrigações legais.Compartilhamento de dados pessoais Você é responsável pelas informações que compartilha. Não nos responsabilizamos por informações falsas ou incorretas. Não compartilhe conteúdo ilegal ou prejudicial. Não divulgamos informações que violem a privacidade.

                    <b>Retenção e exclusão de dados pessoais</b>
                    Tomamos medidas para manter a confidencialidade e segurança de seus dados. No entanto, não somos responsáveis por violações causadas por terceiros. Podemos compartilhar informações em casos legais.

                    <b>Proteção dos dados pessoais</b>
                    Tomamos medidas para manter a confidencialidade e segurança de seus dados, mas não somos responsáveis por violações causadas por terceiros. Podemos divulgar informações conforme exigido por lei.

                    <b>Disposições gerais</b>
                    Não somos responsáveis pelas ações dos usuários. Não garantimos a veracidade e precisão das informações fornecidas pelos usuários. Recomendamos cautela em transações. Não somos responsáveis por obrigações tributárias entre os usuários.

                    Fale com nosso encarregado de dados pessoais
                    Se tiver dúvidas sobre nossa política de privacidade, entre em contato pelo e-mail protecaodadospessoais@gmail.com.

                    Data: 14 de março de 2023.

                    <img className='term-logo2' alt='Logo secundário' src={Logo_sec}/>

                </p>
            </div>
        </div>
    )
}

export default Termo;