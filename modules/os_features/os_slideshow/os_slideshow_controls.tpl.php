<?php 
/**
 * Elements for flexslider to use as controls and pager 
 */
?>

<div id="flex-controls">
  <?php if ($node_count > 1): ?>

  <span id="flex-prev">prev</span>
  <span id="flex-pause">pause</span> 
  <div id="flex-pager">
    <?php for ($i = 0; $i<$node_count; $i++): ?>
      <span id="flex-page-<?php echo $i;?>" class="flex-page-link"><?php echo $i;?> </span>
    <?php endfor; ?>
  </div>
  <span id="flex-next">next</span>

  <?php endif; ?>  
</div>
