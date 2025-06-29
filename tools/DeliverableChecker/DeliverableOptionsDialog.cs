using System;
using System.Windows.Forms;

namespace DeliverableChecker
{
    public partial class DeliverableOptionsDialog : Form
    {
        public DeliverableOptions DeliverableOptions { get; private set; } = new DeliverableOptions();

        private CheckBox modelCompletenessCheck;
        private CheckBox sheetsViewsCheck;
        private CheckBox coordinationCheck;
        private CheckBox documentationCheck;
        private CheckBox qualityCheck;
        private CheckBox standardsCheck;
        private Button okButton;
        private Button cancelButton;

        public DeliverableOptionsDialog()
        {
            InitializeComponent();
            LoadDefaults();
        }

        private void InitializeComponent()
        {
            this.Text = "Deliverable Check Options";
            this.Size = new System.Drawing.Size(500, 450);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;

            int yPos = 20;

            // Title
            var titleLabel = new Label
            {
                Text = "Project Deliverable Readiness Check",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 12, System.Drawing.FontStyle.Bold)
            };
            yPos += 35;

            var subtitleLabel = new Label
            {
                Text = "Select the categories to verify for project delivery:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 9)
            };
            yPos += 35;

            // Check categories
            modelCompletenessCheck = new CheckBox
            {
                Text = "Model Completeness",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(450, 25),
                Checked = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            
            var modelDesc = new Label
            {
                Text = "   • Verify model elements, levels, grids, and spatial elements",
                Location = new System.Drawing.Point(20, yPos + 25),
                Size = new System.Drawing.Size(450, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 8),
                ForeColor = System.Drawing.Color.Gray
            };
            yPos += 55;

            sheetsViewsCheck = new CheckBox
            {
                Text = "Sheets and Views",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(450, 25),
                Checked = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            
            var sheetsDesc = new Label
            {
                Text = "   • Check drawing sheets, view placement, plans, elevations, sections",
                Location = new System.Drawing.Point(20, yPos + 25),
                Size = new System.Drawing.Size(450, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 8),
                ForeColor = System.Drawing.Color.Gray
            };
            yPos += 55;

            coordinationCheck = new CheckBox
            {
                Text = "Coordination and Quality",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(450, 25),
                Checked = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            
            var coordDesc = new Label
            {
                Text = "   • Model warnings, external links, workset organization",
                Location = new System.Drawing.Point(20, yPos + 25),
                Size = new System.Drawing.Size(450, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 8),
                ForeColor = System.Drawing.Color.Gray
            };
            yPos += 55;

            documentationCheck = new CheckBox
            {
                Text = "Documentation",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(450, 25),
                Checked = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            
            var docDesc = new Label
            {
                Text = "   • Title blocks, dimensions, annotations, schedules",
                Location = new System.Drawing.Point(20, yPos + 25),
                Size = new System.Drawing.Size(450, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 8),
                ForeColor = System.Drawing.Color.Gray
            };
            yPos += 55;

            qualityCheck = new CheckBox
            {
                Text = "File Quality",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(450, 25),
                Checked = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            
            var qualityDesc = new Label
            {
                Text = "   • File size, unused families, empty views",
                Location = new System.Drawing.Point(20, yPos + 25),
                Size = new System.Drawing.Size(450, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 8),
                ForeColor = System.Drawing.Color.Gray
            };
            yPos += 55;

            standardsCheck = new CheckBox
            {
                Text = "Standards Compliance",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(450, 25),
                Checked = true,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            
            var standardsDesc = new Label
            {
                Text = "   • Project information, naming conventions, view templates",
                Location = new System.Drawing.Point(20, yPos + 25),
                Size = new System.Drawing.Size(450, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 8),
                ForeColor = System.Drawing.Color.Gray
            };
            yPos += 65;

            // Buttons
            okButton = new Button
            {
                Text = "Run Deliverable Check",
                Location = new System.Drawing.Point(280, yPos),
                Size = new System.Drawing.Size(150, 35),
                DialogResult = DialogResult.OK,
                Font = new System.Drawing.Font("Microsoft Sans Serif", 9, System.Drawing.FontStyle.Bold)
            };
            okButton.Click += OkButton_Click;

            cancelButton = new Button
            {
                Text = "Cancel",
                Location = new System.Drawing.Point(370, yPos),
                Size = new System.Drawing.Size(80, 35),
                DialogResult = DialogResult.Cancel
            };

            this.Controls.AddRange(new Control[] 
            { 
                titleLabel, subtitleLabel,
                modelCompletenessCheck, modelDesc,
                sheetsViewsCheck, sheetsDesc,
                coordinationCheck, coordDesc,
                documentationCheck, docDesc,
                qualityCheck, qualityDesc,
                standardsCheck, standardsDesc,
                okButton, cancelButton 
            });

            this.AcceptButton = okButton;
            this.CancelButton = cancelButton;
        }

        private void LoadDefaults()
        {
            // All options enabled by default for comprehensive check
        }

        private void OkButton_Click(object sender, EventArgs e)
        {
            if (!modelCompletenessCheck.Checked && !sheetsViewsCheck.Checked && 
                !coordinationCheck.Checked && !documentationCheck.Checked && 
                !qualityCheck.Checked && !standardsCheck.Checked)
            {
                MessageBox.Show("Please select at least one deliverable category to check.", 
                    "No Selection", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                this.DialogResult = DialogResult.None;
                return;
            }

            DeliverableOptions = new DeliverableOptions
            {
                CheckModelCompleteness = modelCompletenessCheck.Checked,
                CheckSheetsAndViews = sheetsViewsCheck.Checked,
                CheckCoordination = coordinationCheck.Checked,
                CheckDocumentation = documentationCheck.Checked,
                CheckQuality = qualityCheck.Checked,
                CheckStandards = standardsCheck.Checked
            };
        }
    }
}