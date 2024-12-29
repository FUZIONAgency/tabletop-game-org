import PageLayout from "@/components/PageLayout";
import Section from "@/components/Section";

const MyEarnings = () => {
  return (
    <PageLayout>
      <Section
        id="my-earnings"
        title="My Earnings"
        subtitle="Earnings Overview"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Track your earnings and payment history.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
};

export default MyEarnings;