import { useLogin } from './useLogin'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useLogin', () => {
  it('initial state', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.state).to.deep.equal({
      status: 'idle',
      user: null,
      error: null,
    });
  });

  it('successful login flow', async () => {
    cy.stub(window, 'fetch').resolves({ json: () => ({ token: '123' }) })

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.onSubmit({
        email: 'test@email.com',
        password: 'password',
      });
    });

    // sets state to pending
    expect(result.current.state).to.deep.equal({
      status: 'pending',
      user: null,
      error: null,
    });

    cy.wrap(waitForNextUpdate())
    cy.then(() => {
      // sets state to resolved, stores email address
      expect(result.current.state).to.deep.equal({
        status: 'resolved',
        user: {
          email: 'test@email.com',
        },
        error: null,
      });
    })
  });

  it('error login flow', async () => {
    cy.stub(window, 'fetch')
      .resolves({ json: () => ({ error: 'invalid password' }) });

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.onSubmit({
        email: 'test@email.com',
        password: 'invalid',
      });
    });

    // sets state to pending
    expect(result.current.state).to.deep.equal({
      status: 'pending',
      user: null,
      error: null,
    });

    cy.wrap(waitForNextUpdate())
      .then(() => {
        // sets state to rejected, stores error
        expect(result.current.state).to.deep.equal({
          status: 'rejected',
          user: null,
          error: 'invalid password',
        });
    })

  });
})

