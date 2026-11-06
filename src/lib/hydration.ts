/**
 * Tracks the first client pass over prerendered HTML. Entrance animations check
 * it so content the visitor can already see does not blink out and fade back in.
 */
let hydrating = false;

export const beginHydration = (): void => {
  hydrating = true;
};

export const endHydration = (): void => {
  hydrating = false;
};

export const isHydrating = (): boolean => hydrating;
