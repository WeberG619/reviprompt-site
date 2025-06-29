using System;
using System.Windows.Forms;

namespace ModelAuditor
{
    public partial class AuditOptionsDialog : Form
    {
        public AuditOptions AuditOptions { get; private set; } = new AuditOptions();

        private CheckBox warningsCheck;
        private CheckBox missingLinksCheck;
        private CheckBox unusedFamiliesCheck;
        private CheckBox performanceCheck;
        private CheckBox viewsSheetsCheck;
        private CheckBox worksetsCheck;
        private CheckBox coordinationCheck;
        private CheckBox autoFixCheck;
        private Button okButton;
        private Button cancelButton;

        public AuditOptionsDialog()
        {
            InitializeComponent();
            LoadDefaults();
        }

        private void InitializeComponent()
        {
            this.Text = "Model Audit Options";
            this.Size = new System.Drawing.Size(450, 400);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;

            int yPos = 20;

            // Title
            var titleLabel = new Label
            {
                Text = "Select Audit Categories:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(300, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            yPos += 35;

            // Audit category checkboxes
            warningsCheck = new CheckBox
            {
                Text = "Check Model Warnings",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            missingLinksCheck = new CheckBox
            {
                Text = "Check Missing Links",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            unusedFamiliesCheck = new CheckBox
            {
                Text = "Find Unused Families",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            performanceCheck = new CheckBox
            {
                Text = "Check Model Performance",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            viewsSheetsCheck = new CheckBox
            {
                Text = "Audit Views and Sheets",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            worksetsCheck = new CheckBox
            {
                Text = "Check Worksets",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            coordinationCheck = new CheckBox
            {
                Text = "Coordination Analysis",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 40;

            // Auto-fix option
            autoFixCheck = new CheckBox
            {
                Text = "Auto-fix Issues (where possible)",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = false,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 9, System.Drawing.FontStyle.Bold)
            };
            yPos += 40;

            // Buttons
            okButton = new Button
            {
                Text = "Start Audit",
                Location = new System.Drawing.Point(240, yPos),
                Size = new System.Drawing.Size(120, 35),
                DialogResult = DialogResult.OK
            };
            okButton.Click += OkButton_Click;

            cancelButton = new Button
            {
                Text = "Cancel",
                Location = new System.Drawing.Point(300, yPos),
                Size = new System.Drawing.Size(80, 35),
                DialogResult = DialogResult.Cancel
            };

            this.Controls.AddRange(new Control[] 
            { 
                titleLabel,
                warningsCheck, missingLinksCheck, unusedFamiliesCheck,
                performanceCheck, viewsSheetsCheck, worksetsCheck, coordinationCheck,
                autoFixCheck,
                okButton, cancelButton 
            });

            this.AcceptButton = okButton;
            this.CancelButton = cancelButton;
        }

        private void LoadDefaults()
        {
            // All options enabled by default for comprehensive audit
        }

        private void OkButton_Click(object sender, EventArgs e)
        {
            if (!warningsCheck.Checked && !missingLinksCheck.Checked && !unusedFamiliesCheck.Checked &&
                !performanceCheck.Checked && !viewsSheetsCheck.Checked && !worksetsCheck.Checked && 
                !coordinationCheck.Checked)
            {
                MessageBox.Show("Please select at least one audit category.", 
                    "No Selection", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                this.DialogResult = DialogResult.None;
                return;
            }

            AuditOptions = new AuditOptions
            {
                CheckWarnings = warningsCheck.Checked,
                CheckMissingLinks = missingLinksCheck.Checked,
                CheckUnusedFamilies = unusedFamiliesCheck.Checked,
                CheckModelPerformance = performanceCheck.Checked,
                CheckViewsAndSheets = viewsSheetsCheck.Checked,
                CheckWorksets = worksetsCheck.Checked,
                CheckCoordination = coordinationCheck.Checked,
                AutoFixIssues = autoFixCheck.Checked
            };
        }
    }
}