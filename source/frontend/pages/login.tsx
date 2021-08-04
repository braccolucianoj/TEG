import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FacebookFilled, GoogleOutlined, TwitterCircleFilled } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { Button, Col, Divider, Input, Row } from 'antd';

import APIService from '../services/api';
import { withTranslation } from '../i18n';
import loginText from '../services/i18n/login';
import { useAPICall } from '../components/hooks';
import { withLanguageChange } from '../components/HOC';
import { CustomInputRaw } from '../components/atoms/CustomInput';
import { loginFormSchema, PASSWORD_MIN_LENGTH } from '../services/schemas';

import './styles/login.scss';

const LoginContainer = styled(Row)`
  height: 100vh;
  width: 100vw;
`;

const Form = styled.form`
  margin-top: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoContainer = styled(Col)`
  background-color: #c5a37a;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loginbutton = styled(Button)`
  margin-top: 1rem;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
`;

const LinkButtonContainer = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialButtonContainer = styled(LinkButtonContainer)`
  padding: 0 10px;
`;

const SocialButton = styled(Button)`
  width: 100%;
  height: 50px;
  font-size: 22px;
`;

const fields = {
  password: 'password',
  emailUsername: 'emailUsername',
};

const styles = {
  inputContainer: {
    width: '80%',
    'margin-top': '15px',
  },
  input: {
    width: '100%',
  },
};

const inputs = [
  { name: fields.emailUsername, label: loginText.emailUsernameLabel },
  {
    name: fields.password,
    label: loginText.passwordLabel,
    InputComponent: Input.Password,
    errorExtra: {
      number: PASSWORD_MIN_LENGTH,
    },
  },
];

const defaultValues = {
  password: '',
  emailUsername: '',
} as any;

const LoginPage = ({ t }: any): JSX.Element => {
  const router = useRouter();
  const [, loading, errorAPI, execute] = useAPICall(APIService.login, {
    onSuccess: () => router.push('/home'),
  });

  const handleSignup = () => router.push('/signup');

  const { control, handleSubmit, errors, formState } = useForm({
    resolver: loginFormSchema,
    reValidateMode: 'onChange',
    defaultValues,
    criteriaMode: 'all',
    mode: 'all',
  });

  return (
    <LoginContainer>
      <Col className="fullHeight" span={6}>
        <Form onSubmit={handleSubmit(async (data) => execute({ data }))}>
          {inputs.map(({ name, label, InputComponent, errorExtra, ...rest }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ onChange, value, onBlur, ref }) => (
                <CustomInputRaw
                  {...rest}
                  ref={ref}
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  label={t(label)}
                  onChange={onChange}
                  InputComponent={InputComponent || Input}
                  placeholder={t(loginText.enterText)}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                />
              )}
            />
          ))}
          <Loginbutton loading={loading} disabled={loading || !formState.isValid} type="primary" htmlType="submit">
            {t(loginText.loginButton)}
          </Loginbutton>
        </Form>
        <Divider type="horizontal" />
        <Row>
          <LinkButtonContainer span={12}>
            <Loginbutton loading={loading} type="link" onClick={handleSignup}>
              {t(loginText.signupLink)}
            </Loginbutton>
          </LinkButtonContainer>
          <LinkButtonContainer span={12}>
            <Loginbutton loading={loading} type="link">
              {t(loginText.restorePasswordLink)}
            </Loginbutton>
          </LinkButtonContainer>
        </Row>
        <Divider type="horizontal">or</Divider>
        <Row>
          <SocialButtonContainer span={8}>
            <SocialButton>
              <FacebookFilled />
            </SocialButton>
          </SocialButtonContainer>
          <SocialButtonContainer span={8}>
            <SocialButton>
              <GoogleOutlined />
            </SocialButton>
          </SocialButtonContainer>
          <SocialButtonContainer span={8}>
            <SocialButton>
              <TwitterCircleFilled />
            </SocialButton>
          </SocialButtonContainer>
        </Row>
      </Col>
      <LogoContainer className="fullHeight" span={18}>
        <Logo src="https://i.ytimg.com/vi/HXcFZuWOOpE/maxresdefault.jpg" />
      </LogoContainer>
    </LoginContainer>
  );
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default withLanguageChange(withTranslation(['login'])(LoginPage));
