import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";

const MyTeam = () => {
  return (
    <PageLayout>
      <Section>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">My Team</h1>
          <p className="text-muted-foreground">
            View and manage your team members here.
          </p>
        </div>
      </Section>
    </PageLayout>
  );
};

export default MyTeam;