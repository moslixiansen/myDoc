#### sql 分块处理，执行计划任务显示进度条

```php
public function handle()
{
    try {
        $start_time = $this->option('start_time');
        $end_time = $this->option('end_time');
        $query = ElemebaiOrderModel::query()->OfDateStringBetween($start_time, $end_time);
        $count = (clone $query)->count();
        $this->progressBar = $this->output->createProgressBar($count);
        $query->chunk(100, function($eleOrders){
            foreach ($eleOrders as $eleOrder){
                $store = StoreModel::query()->where('gid', $eleOrder->FK_store_gid)->first();
                ElemebaiService::refreshDetailInfo($eleOrder['orders'], $store);
                WaimaiOrderModel::generateEBWaimaiOrder($eleOrder);
                $this->progressBar->advance();
            }
        });
        $this->progressBar->finish();
    } catch (\Exception $e) {
        \Log::info('     '.__method__.'() line:'.__line__.'     $e  = '.print_r(Util::getExceptionMessage($e), true));
    }
}
```