import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from '../auth';
import { AccountService, AccountDetails } from './account.service';

describe('AccountService', () => {
  class AccountServiceMock {
    getConfig() {
      return { ApiUrl: 'http://mock-api.com' };
    }
  }

  let httpTestingController: HttpTestingController;
  let service: AccountService;
  const mockAccount: AccountDetails = {
    id: '123',
    name: 'john',
    description: '',
    numberOfUsers: 1,
    status: 0,
    incomingCategoriesAvailable: [{
      id: '001',
      type: 1,
      value: '',
      isEditable: false,
      iconId: 0,
    }],
    expenseCategoriesAvailable: [{
      id: '001',
      type: 1,
      value: '',
      isEditable: false,
      iconId: 0,
    }],
    totalMonthlyExpense: 1,
    totalMonthlyIncoming: 1,
    incomingOverviewMovement: {},
    expenseOverviewMovement: {},
    lastMovements: [],
    members: [],
    administrators: [],
    numberOfPendingAccountInvites: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AccountService,
        { provide: AuthService, useClass: AccountServiceMock },
      ],
    });

    service = TestBed.get(AccountService);
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserAccounts should return an array of accounts' +
  'fetched from an `/accounts` API endpoint', () => {
    const testData: Array<AccountDetails> = [mockAccount];

    service.getUserAccounts()
      .subscribe(data => {
        expect(data).toEqual(testData);
      });

    const req = httpTestingController
      .expectOne('http://mock-api.com/protected/v1/accounts');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
    httpTestingController.verify();
  });

  it('getAccountDetails should return the account detail ' +
  'for the specified account id fetched from the API', () => {
    service.getAccountDetails('123')
      .subscribe(data => {
        expect(data).toEqual(mockAccount);
      });

    const req = httpTestingController
      .expectOne('http://mock-api.com/protected/v1/accounts/123');

    expect(req.request.method).toEqual('GET');

    req.flush(mockAccount);
    httpTestingController.verify();
  });
});
