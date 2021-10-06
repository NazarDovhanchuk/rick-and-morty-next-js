import React, { useEffect, useState } from 'react';

const Failure = (): JSX.Element => {
  const [name, setName] = useState('Name');

  const handlerOnChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    setName(e.target.value);
  };

  if (name === 'Name') {
    useEffect(() => {

    }, [name]);
  }

  return (
    <div>
      <input type="text" placeholder="SetName" value={name} onChange={handlerOnChange} />
      Hello
    </div>
  );
};

export default Failure;
