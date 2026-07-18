import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Profile } from "src/app/core/models/profile";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { ProfileService } from "src/app/core/services/profile/profile.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  serverUrl = environment.serverUrl;
  
  profileForm!: FormGroup;
  profile!: Profile;
  loading = false;
  saving = false;
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phone: ['']
    });
  }

  loadProfile(): void {
    this.loading = true;
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile = response.data;
        this.profileForm.patchValue({
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          email: this.profile.email,
          phone: this.profile.phone
        });

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.profileService.updateProfile(this.profileForm.getRawValue()).subscribe({
      next: (response) => {
        this.profile = response.data;
        this.authService.updateUser({
          ...this.authService.getUser()!,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          role: response.data.role,
          profileImage: response.data.profileImage
        });

        alert(response.message);

        this.saving = false;
      },

      error: (error) => {
        console.error(error);

        this.saving = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];

    console.log(this.selectedFile);

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    console.log('Uploading:', this.selectedFile);

    this.profileService.uploadProfileImage(this.selectedFile).subscribe({
      next: (response) => {
        console.log(response);
        this.profile = response.data;
        this.authService.updateUser({
          ...this.authService.getUser()!,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          role: response.data.role,
          profileImage: response.data.profileImage
        });

        this.selectedFile = undefined as any;
        this.imagePreview = null;

        alert(response.message);
      },

      error: (error) => {
        console.error(error);
      }
    });
  }

  cancel(): void {
    this.profileForm.patchValue({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      email: this.profile.email,
      phone: this.profile.phone
    });

    this.imagePreview = null;
  }
}