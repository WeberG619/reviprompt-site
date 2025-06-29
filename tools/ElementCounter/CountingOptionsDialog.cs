using System;
using System.Windows.Forms;

namespace ElementCounter
{
    public partial class CountingOptionsDialog : Form
    {
        public CountingOptions CountingOptions { get; private set; } = new CountingOptions();

        private CheckBox modelElementsOnlyCheck;
        private CheckBox activeViewOnlyCheck;
        private CheckBox selectedOnlyCheck;
        private CheckBox countByLevelCheck;
        private CheckBox countByWorksetCheck;
        private CheckBox countByTypeCheck;
        private CheckBox includeAnalysisCheck;
        private CheckBox excludeAnnotationsCheck;
        private CheckBox excludeViewsCheck;
        private Button okButton;
        private Button cancelButton;

        public CountingOptionsDialog()
        {
            InitializeComponent();
            LoadDefaults();
        }

        private void InitializeComponent()
        {
            this.Text = "Element Counting Options";
            this.Size = new System.Drawing.Size(450, 450);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;

            int yPos = 20;

            // Title
            var titleLabel = new Label
            {
                Text = "Element Counting Configuration:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(300, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 10, System.Drawing.FontStyle.Bold)
            };
            yPos += 35;

            // Scope options
            var scopeLabel = new Label
            {
                Text = "Counting Scope:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(300, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 9, System.Drawing.FontStyle.Bold)
            };
            yPos += 25;

            modelElementsOnlyCheck = new CheckBox
            {
                Text = "Count only model elements (exclude types/symbols)",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            activeViewOnlyCheck = new CheckBox
            {
                Text = "Count elements in active view only",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = false
            };
            yPos += 30;

            selectedOnlyCheck = new CheckBox
            {
                Text = "Count selected elements only",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = false
            };
            yPos += 35;

            // Breakdown options
            var breakdownLabel = new Label
            {
                Text = "Count Breakdown:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(300, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 9, System.Drawing.FontStyle.Bold)
            };
            yPos += 25;

            countByLevelCheck = new CheckBox
            {
                Text = "Break down counts by level",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            countByWorksetCheck = new CheckBox
            {
                Text = "Break down counts by workset",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            countByTypeCheck = new CheckBox
            {
                Text = "Break down counts by element type",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = false
            };
            yPos += 35;

            // Analysis options
            var analysisLabel = new Label
            {
                Text = "Additional Analysis:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(300, 20),
                Font = new System.Drawing.Font("Microsoft Sans Serif", 9, System.Drawing.FontStyle.Bold)
            };
            yPos += 25;

            includeAnalysisCheck = new CheckBox
            {
                Text = "Include area/length calculations and statistics",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            excludeAnnotationsCheck = new CheckBox
            {
                Text = "Exclude annotation elements (tags, dimensions)",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 30;

            excludeViewsCheck = new CheckBox
            {
                Text = "Exclude views and sheets from count",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 25),
                Checked = true
            };
            yPos += 40;

            // Buttons
            okButton = new Button
            {
                Text = "Count Elements",
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
                titleLabel, scopeLabel, breakdownLabel, analysisLabel,
                modelElementsOnlyCheck, activeViewOnlyCheck, selectedOnlyCheck,
                countByLevelCheck, countByWorksetCheck, countByTypeCheck,
                includeAnalysisCheck, excludeAnnotationsCheck, excludeViewsCheck,
                okButton, cancelButton 
            });

            this.AcceptButton = okButton;
            this.CancelButton = cancelButton;
        }

        private void LoadDefaults()
        {
            // Sensible defaults for most counting scenarios
        }

        private void OkButton_Click(object sender, EventArgs e)
        {
            CountingOptions = new CountingOptions
            {
                CountOnlyModelElements = modelElementsOnlyCheck.Checked,
                CountInActiveViewOnly = activeViewOnlyCheck.Checked,
                CountSelectedOnly = selectedOnlyCheck.Checked,
                CountByLevel = countByLevelCheck.Checked,
                CountByWorkset = countByWorksetCheck.Checked,
                CountByType = countByTypeCheck.Checked,
                IncludeAnalysis = includeAnalysisCheck.Checked,
                ExcludeAnnotations = excludeAnnotationsCheck.Checked,
                ExcludeViews = excludeViewsCheck.Checked
            };
        }
    }
}