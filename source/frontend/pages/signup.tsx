import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Input, Button, Row, Col, DatePicker } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import { UploadFile } from 'antd/lib/upload/interface';

import './styles/signup.scss';
import { withTranslation } from '../i18n';
import signupText from '../services/i18n/signup';
import PictureWall from '../components/atoms/PictureWall';
import CustomInput from '../components/atoms/CustomInput';
import {
  signupFormSchema,
  getErrorMessage,
  BASE_REGEXP_UERNAME,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../services/schemas';
import GameEventsStrip from '../components/molecules/GameEventsStrip';
import ProfileCard from '../components/atoms/ProfileCard';
import { IUserData } from '../constants/modelTypes.constants';
import APIService from '../services/api';
import { useAPICall } from '../components/hooks';
import { withLanguageChange } from '../components/HOC';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  passwrod: '',
  repeatPasswrod: '',
  birthDate: moment().endOf('day').subtract(1, 'days'),
} as any;

const fields = {
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'password',
  repeatPassword: 'repeatPassword',
  email: 'email',
  username: 'username',
  birthDate: 'birthDate',
};

const inputs = [
  { name: fields.firstName, label: signupText.firstNameLabel },
  { name: fields.lastName, label: signupText.lastNameLabel },
  { name: fields.email, label: signupText.emailLabel, extraProps: { inputMode: 'email' } },
  {
    name: fields.password,
    label: signupText.passwordLabel,
    InputComponent: Input.Password,
    placeholder: signupText.enterText,
    errorExtra: {
      number: PASSWORD_MIN_LENGTH,
    },
  },
  {
    name: fields.repeatPassword,
    label: signupText.repeatPasswordLabel,
    InputComponent: Input.Password,
    placeholder: signupText.enterText,
  },
  {
    name: fields.username,
    label: signupText.usernameLabel,
    prefix: '@',
    placeholder: signupText.enterText,
    onKeyPress: (e: React.KeyboardEvent): boolean | undefined => {
      const specialCharRegex = new RegExp(`${BASE_REGEXP_UERNAME}$`);
      if (!specialCharRegex.test(e.key)) {
        e.preventDefault();
        return false;
      }
      return undefined;
    },
    errorExtra: {
      number: USERNAME_MIN_LENGTH,
    },
  },
  {
    name: fields.birthDate,
    label: signupText.birthDateLabel,
    InputComponent: DatePicker,
    disabledTime: true,
    placeholder: signupText.enterText,
    disabledDate: (current: any) => current && current >= moment().endOf('day'),
  },
];

const watchedFields = [fields.firstName, fields.lastName, fields.email, fields.username, fields.birthDate];

const SignupPage = ({ t }: any) => {
  const router = useRouter();
  const [, loading, errorAPI, execute] = useAPICall(APIService.signup, {
    onSuccess: () => router.push('/login'),
  });
  const { control, handleSubmit, errors, formState, watch } = useForm({
    resolver: signupFormSchema,
    reValidateMode: 'onChange',
    defaultValues,
    criteriaMode: 'all',
    mode: 'all',
  });
  const [picture, setPicture] = useState<UploadFile>();
  const user = watch(watchedFields);

  const errorValue = useCallback((name: string, extra?: any) => getErrorMessage(t, errors, name, extra), [errors, t]);

  return (
    <div className="signupContainer">
      <form onSubmit={handleSubmit(async (data) => execute({ data }))}>
        <Row>
          <Col span={17}>
            {inputs.map(({ name, label, extraProps = {}, InputComponent, placeholder, errorExtra, ...rest }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                {...extraProps}
                render={({ onChange, value, onBlur, ref }) => (
                  <CustomInput
                    {...rest}
                    ref={ref}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    label={t(label)}
                    onChange={onChange}
                    error={errorValue(name, errorExtra)}
                    InputComponent={InputComponent || Input}
                    placeholder={t(placeholder || signupText.enterText)}
                  />
                )}
              />
            ))}
          </Col>
          <Col span={7}>
            <Row className="row-40">
              <PictureWall onUploadFinish={setPicture} />
            </Row>
            <Row className="row-40">
              <ProfileCard user={{ ...user, imageURL: picture ? picture.preview : undefined } as IUserData} />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col offset={7} span={3}>
            <Button
              id="signupButton"
              loading={loading}
              disabled={loading || !formState.isValid}
              type="primary"
              htmlType="submit"
            >
              {t(signupText.signupButton)}
            </Button>
          </Col>
        </Row>
      </form>
      <GameEventsStrip />
    </div>
  );
};

SignupPage.getInitialProps = async () => ({
  namespacesRequired: ['signup'],
});

export default withLanguageChange(withTranslation(['signup'])(SignupPage));
