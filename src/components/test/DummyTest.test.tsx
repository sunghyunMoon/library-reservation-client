import { render, screen } from '@testing-library/react';
import DummyTest from './DummyTest';


test('렌더링 테스트: Test CI by Moon', () => {
  render(<DummyTest />);
  expect(screen.getByText(/Test CI by Moon/i)).toBeInTheDocument();
});
