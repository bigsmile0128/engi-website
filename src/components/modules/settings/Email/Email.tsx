import Button from '~/components/global/Button/Button';

function Email() {
  const handleVerifyEmail = () => {};

  return (
    <div className="p-8 flex flex-col">
      <h2 className="font-grifter font-bold text-3xl hidden md:block">
        Verify your email
      </h2>
      <h6 className="text-secondary hidden md:block">
        From your mobile device, tap the button below to confirm:
      </h6>
      <div className="text-center  my-12">
        <Button onClick={handleVerifyEmail} variant="primary" className="w-2/5">
          Verify Email Address
        </Button>
      </div>
      <p className="text-secondary text-center">
        If you didn’t request this email. there’s nothing to worry about - you
        can safely ignore it
      </p>
    </div>
  );
}

export default Email;
