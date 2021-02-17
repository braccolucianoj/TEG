import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import signupText from '../../../services/i18n/signup';

import './profileCard.style.scss';
import { IUserData, IUser } from '../../../constants/modelTypes.constants';
import { useTranslation } from '../../../i18n';

export interface IProfileCardProps {
  user: IUserData | IUser;
}

const { Title } = Typography;

const ProfileCard = ({ user = {} as IUserData }: IProfileCardProps): JSX.Element => {
  const { t } = useTranslation();
  const { imageURL, email, firstName, lastName, username } = user;
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>();

  const cardTitle = useMemo(() => {
    let result = `${lastName || t(signupText.lastNameLabel)}, `;
    result += firstName || t(signupText.firstNameLabel);
    return result;
  }, [lastName, firstName]);

  const onError = useCallback(() => {
    setAvatarSrc(undefined);
    return true;
  }, []);

  useEffect(() => {
    if (imageURL) {
      setAvatarSrc(imageURL);
    }
  }, [imageURL]);

  return (
    <div className="profileCardContainer">
      <Card bordered size="default" className="">
        <Card.Meta
          avatar={<Avatar src={avatarSrc} icon={<UserOutlined />} onError={onError} />}
          title={
            <>
              <Title className="profileCardTitle" level={5}>
                {cardTitle}
              </Title>
              <span className="profileCardTitle">{'  |  '}</span>
              <p className="profileCardTitle">{email || t(signupText.emailLabel)}</p>
            </>
          }
          description={`@${username || t(signupText.usernameLabel).toLowerCase()}`}
        />
      </Card>
    </div>
  );
};

export default ProfileCard;
