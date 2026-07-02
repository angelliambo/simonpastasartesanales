import React from 'react';
import styled from 'styled-components';
import { READING_SPEED } from '../../../config/speed';

interface SpeedSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 140px;
`;

const Slider = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: ${({ theme }) => theme.colors.border.normal};
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary[500]};
    border: 2px solid white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.15s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }
`;

const DotsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 6px;
  box-sizing: border-box;
`;

const Dot = styled.span<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary[500] : theme.colors.border.normal)};
  transition: background 0.2s;
  cursor: pointer;
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const SpeedSlider: React.FC<SpeedSliderProps> = ({ value, onChange }) => {
  const vals = READING_SPEED.values;
  const currentIndex = vals.indexOf(value as typeof vals[number]);
  const sliderValue = currentIndex >= 0 ? currentIndex + READING_SPEED.min : READING_SPEED.default;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pos = parseInt(e.target.value, 10);
    onChange(vals[pos - READING_SPEED.min]);
  };

  const handleDotClick = (pos: number) => {
    onChange(vals[pos - READING_SPEED.min]);
  };

  return (
    <Wrapper>
      <Slider
        type="range"
        min={READING_SPEED.min}
        max={READING_SPEED.max}
        step={READING_SPEED.step}
        value={sliderValue}
        onChange={handleChange}
      />
      <DotsRow>
        {Array.from({ length: READING_SPEED.max }, (_, i) => i + READING_SPEED.min).map(pos => (
          <Dot key={pos} $active={pos === sliderValue} onClick={() => handleDotClick(pos)} />
        ))}
      </DotsRow>
      <Labels>
        {READING_SPEED.labels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </Labels>
    </Wrapper>
  );
};

export default SpeedSlider;
