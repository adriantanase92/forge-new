<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/shared/components/general/button/Button.svelte';
	import { capitalize, emailValidator, passwordValidator } from '$lib/shared/index.js';
	import FieldError from '$lib/shared/components/general/form/FieldError.svelte';
	import FormError from '$lib/shared/components/general/form/FormError.svelte';
	import Input from '$lib/shared/components/general/form/Input.svelte';
	import PasswordWithIcon from '$lib/shared/components/general/form/PasswordWithIcon.svelte';

	export let data;

	console.log('this is the login page');

	// Setup for form ---------------------------------------------------------------------------
	const form = superForm(data.form, {
		validators: {
			email: (email) => emailValidator(email, $LL),
			password: (password) => passwordValidator(password, $LL)
		},
		errorSelector: '[aria-invalid="true"]',
		scrollToError: 'smooth',
		autoFocusOnError: 'detect',
		stickyNavbar: '#main-header',
		resetForm: true
	});
	const { form: formData, errors, enhance, delayed, message } = form;
</script>

<div class="h-screen w-screen flex items-center justify-center">
	<div class="w-full mx-auto h-full flex">
		<div class="w-full sm:w-1/2 md:w-1/3 flex items-center justify-center bg-green-300">
			<form id="loginForm" method="POST" use:enhance>
				<div class="flex flex-col gap-6">
					<div>
						<Input
							aria-invalid={$errors.email ? 'true' : undefined}
							placeholder={capitalize($LL.fields.email.text())}
							{form}
							field="email"
							type="text"
							id="email"
							class=""
						/>
						<FieldError errors={$errors.email} />
					</div>

					<div>
						<PasswordWithIcon let:prop={type}>
							<Input
								aria-invalid={$errors.password ? 'true' : undefined}
								placeholder={capitalize($LL.fields.password.text())}
								{form}
								field="password"
								{type}
								id="password"
							/>
						</PasswordWithIcon>
						<FieldError errors={$errors.password} />
					</div>

					{#if $message !== undefined && $message.status === 'error'}
						<FormError errorMessage={$message.text} />
					{/if}

					<div class="flex items-center justify-between">
						<Button
							kind="fill"
							color="curious"
							class="inline-flex items-center justify-center gap-2 px-4 py-2.5"
							type="submit"
							form="loginForm"
							disabled={$delayed}
							delayed={$delayed}
						>
							{$LL.buttonsOrLinks.confirm()}
						</Button>
					</div>
				</div>
			</form>
		</div>

		<div class="flex-1 hidden sm:flex items-center justify-center bg-blue-300">
			<p>Second Column Content</p>
		</div>
	</div>
</div>
