import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// slider코드

export const SliderParent = styled.div`
  position: relative;
`;

export const CustomSlider = styled.input`
  height: 10px;
  background: linear-gradient(
    93deg,
    #46a6ff -11.56%,
    rgba(251, 70, 255, 0.21) 70.52%
  ); /* 원하는 배경색으로 지정하세요 */
  border-radius: 5px;
  outline: none;

  /* 추가된 부분 */
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    width: 14.5rem;
    height: 0.75rem;
    background-color: #fff; /* 슬라이더 핸들의 배경색을 원하는 색으로 지정하세요 */
    border-radius: 50%;
    cursor: pointer;
  }
`;

interface BubbleProps {
  value: number;
}

export const Bubble = styled.div<BubbleProps>`
  position: relative;
  text-align: center;
  /* left: ${(props) => `${Number(props.value / 4)}px`}; */
`;

interface AppProps {
  onSliderChange: (value: number) => void;
}

const Rating: React.FC<AppProps> = ({ onSliderChange }) => {
  const [value, onChange] = useState(0);

  useEffect(() => {
    onSliderChange(value); // 부모로 선택한 값을 전달
    // console.log('Slider Value:', value);
  }, [onSliderChange, value]);

  return (
    <SliderParent style={{ textAlign: 'center' }}>
      <CustomSlider
        type="range"
        min="-5"
        max="5"
        value={value}
        onChange={({ target: { value: radius } }) => {
          onChange(Number(radius));
        }}
      />
      <Bubble value={value} className="bubble">
        {value}
      </Bubble>
    </SliderParent>
  );
};
export default Rating;
