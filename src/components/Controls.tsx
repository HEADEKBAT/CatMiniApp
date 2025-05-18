import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  gap: 10px;
`;

type Props = {
  enabled: boolean;
  autoRefresh: boolean;
  onEnabledChange: () => void;
  onAutoRefreshChange: () => void;
  onGetCat: () => void;
};

export const Controls = ({
  enabled,
  autoRefresh,
  onEnabledChange,
  onAutoRefreshChange,
  onGetCat,
}: Props) => (
  <Wrapper>
    <Label>
      <input type="checkbox" checked={enabled} onChange={onEnabledChange} />
      Enabled
    </Label>
    <Label >
      <input type="checkbox" checked={autoRefresh} onChange={onAutoRefreshChange} />
      Auto-refrash every 5 second
    </Label>
    <button onClick={onGetCat}>Get cat</button>
  </Wrapper>
);
