import React, { FC, useCallback, useContext, useState } from 'react';
import { ClientContext } from '../contexts/ClientContext';
import { useSafeEffect } from '../hooks/useSafeEffect';
import { Simple } from './templates/Simple';
import { Twitter } from './templates/Twitter';

const templates = {
  Simple,
  Twitter,
};

export interface LikeButtonTemplateComponentProps {
  isLoading: boolean;
  userLiked: boolean | undefined;
  totalLikes: number | undefined;
  handlePress: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isCounterVisible: boolean;
}

type CallbackProps = Components.Schemas.LikeButton['data'];

export interface LikeButtonProps {
  id: string;
  namespace?: string;
  hideCounterIfLessThan?: number;
  onLoad?: (props: CallbackProps) => void;
  onPress?: (props: CallbackProps) => void;
  children?: (
    props: LikeButtonTemplateComponentProps
  ) => React.ReactElement<any, any> | null;
  component?: React.ComponentType<LikeButtonTemplateComponentProps>;
}

type FCWithTemplates<Props> = FC<Props> & {
  templates: {
    Simple: React.ComponentType<LikeButtonTemplateComponentProps>;
    Twitter: React.ComponentType<LikeButtonTemplateComponentProps>;
  };
};

const LikeButton: FCWithTemplates<LikeButtonProps> = ({
  id,
  namespace,
  hideCounterIfLessThan,
  children,
  component,
  onLoad,
  onPress,
}) => {
  const client = useContext(ClientContext);

  const [response, setResponse] = useState<
    Components.Schemas.LikeButton['data'] | null
  >(null);

  useSafeEffect(async () => {
    try {
      if (client) {
        const result = await client.likeButtons.info({ id, namespace });
        setResponse(result.data);

        if (onLoad) {
          onLoad(result.data);
        }
      }
    } catch (error) {
      console.error('Lyket error:', error);
      throw error;
    }
  }, [client, id, namespace, onLoad]);

  const handlePress = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!client) {
        return;
      }

      try {
        const result = await client.likeButtons.press({ id, namespace });
        setResponse(result.data);

        if (onPress) {
          onPress(result.data);
        }
      } catch (error) {
        console.error('Lyket error:', error);
        throw error;
      }
    },
    [client, id, namespace, onPress]
  );

  let isCounterVisible = true;

  if (
    !response ||
    (hideCounterIfLessThan &&
      response &&
      response.attributes.total_likes < hideCounterIfLessThan)
  ) {
    isCounterVisible = false;
  }

  const props = {
    isLoading: !response,
    totalLikes: (response && response.attributes.total_likes) || 0,
    userLiked: (response && response.attributes.user_has_liked) || false,
    handlePress,
    isCounterVisible,
  };

  if (children) {
    return children(props);
  }

  const Component = component || Simple;

  return <Component {...props} />;
};

LikeButton.templates = templates;

export { LikeButton };
