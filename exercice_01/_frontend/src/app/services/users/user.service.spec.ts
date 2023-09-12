import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserRole } from 'src/app/interfaces/user.interface';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no pending requests in each test.
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should check if a user exists. You must to creted first {name: "name", email: "test@gmail.com", password: "test12345678"}', (done) => {
    const email = 'test@gmail.com';
    const mockResponse = true;

    userService.userExist(email).subscribe((exists) => {
      expect(exists).toBe(true);
      done();
    });

    const req = httpTestingController.expectOne('api/users/exist');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });

    req.flush(mockResponse);
  });

  it('should retrieve a user by ID', (done) => {
    const userId = 1;
    const mockUser = { id: 1, name: 'Test User', email: 'one@email.es', password: 'test12345678', role: UserRole.USER, profileImage: null };

    userService.findOne(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpTestingController.expectOne(`/api/users/${userId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUser);
  });

  it('should update a user', (done) => {
    const userToUpdate = { id: 1, name: 'Updated User', email: 'one@email.es', password: 'test12345678', role: UserRole.USER, profileImage: null  };
    const updatedUser = { ...userToUpdate, name: 'Updated User Name' };

    userService.updateOne(userToUpdate).subscribe((user) => {
      expect(user).toEqual(updatedUser);
      done();
    });

    const req = httpTestingController.expectOne(`api/users/${userToUpdate.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(userToUpdate);

    req.flush(updatedUser);
  });

  it('should handle errors when checking user existence', (done) => {
    const email = 'test@example.com';

    userService.userExist(email).subscribe(
      () => fail('Expected an error, but got a response.'),
      (error) => {
        expect(error).toBeTruthy();
        done();
      }
    );

    const req = httpTestingController.expectOne('api/users/exist');
    req.error(new ErrorEvent('Network error'), { status: 500 });
  });
});
