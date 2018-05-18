import { User, Account } from '../auth/auth.service';

export interface Category {
  id: string;
  type: number;
  value: string;
  isEditable: boolean;
  iconId: number;
}

export interface Movement {
  id: string;
  type: number;
  amount: number;
  executedBy: User;
  executedAt: number;
  uptadedAt: number;
  note: string;
  category: Category;
  auto: boolean;
}

export interface AccountDetails extends Account {
  incomingCategoriesAvailable: Array<Category>;
  expenseCategoriesAvailable: Array<Category>;
  totalMonthlyIncoming: number;
  totalMonthlyExpense: number;
  incomingOverviewMovement: any;
  expenseOverviewMovement: any;
  lastMovements: Array<Movement>;
  members: Array<User>;
  administrators: Array<String>;
  numberOfPendingAccountInvites: number;
}
