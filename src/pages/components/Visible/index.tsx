import React, { useState } from 'react';

const Visible = ({
  children,
}: {
  children: ({
    visible,
    setVisible,
  }: {
    visible: boolean;
    setVisible: (visible: boolean) => void;
  }) => React.ReactElement;
}) => {
  const [visible, setVisible] = useState(false);

  return children({ visible, setVisible });
};

export default Visible;
