
export interface Clause {
  content: string;
  name: string;
}

export interface ContractClause {
  id: string;
  name: string;
  clause: Clause;
}

export interface Contract {
  id: string;
  name: string;
  description: string;
  contract_class: {
    name: string;
  };
}

export interface ContractProfile {
  id: string;
  contract: Contract;
}
