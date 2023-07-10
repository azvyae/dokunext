interface Environment {
  name: string;
  value: string;
}

interface EnvironmentState {
  active: Environment['value'];
  environments: Environment[];
}

export type { Environment, EnvironmentState };
