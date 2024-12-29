import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";

const MyEarnings = () => {
  return (
    <PageLayout>
      <Section>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">My Earnings</h1>
          <p className="text-muted-foreground">
            Track your earnings and payment history.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
};

export default MyEarnings;